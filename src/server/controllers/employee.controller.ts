import express, { Request, Response } from 'express';
import reduce from 'lodash-es/reduce';
import { BaseResponse, Employee, EmployeeSchema, GetEmployeeParams, PaginationResponseData } from 'shared/types';
import { EMPLOYEE_TABLE, getDb } from '../database';

export class EmployeeController {
  static router = express.Router();

  static async getEmployees(
    req: Request<any, any, any, GetEmployeeParams>,
    res: Response<PaginationResponseData<Employee> | BaseResponse>,
  ) {
    const { pageNumber, pageSize, search, order, orderBy } = req.query;
    const currentPage = Number(pageNumber) || 1;
    const limit = Number(pageSize) || 10;
    const drop = (currentPage - 1) * limit;
    try {
      const db = await getDb();
      const totalItems = db.chain.get(EMPLOYEE_TABLE).size().value();
      const query = db.chain
        .get(EMPLOYEE_TABLE)
        .filter((employee) => {
          if (!search) return true;
          return employee.name.toLowerCase().includes(search.toLowerCase());
        })
        .map((employee) => {
          const year = reduce(
            employee.positions,
            (total, position) =>
              total +
              reduce(
                position.toolLanguages,
                (subTotal, toolLanguage) => subTotal + (toolLanguage.to - toolLanguage.from),
                0,
              ),
            0,
          );
          return { ...employee, year };
        })
        .orderBy([order ?? 'name'], [orderBy ?? 'asc'])
        .slice(drop, pageNumber * pageSize);

      const totalPages = Math.ceil(totalItems / pageSize);
      const data = query.value();
      const hasNextPage = currentPage < totalPages;

      res
        .status(200)
        .json({ success: true, data, totalItems, totalPages, hasNextPage, pageNumber: currentPage, pageSize: limit });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async getEmployee(req: Request<any, any, any, any>, res: Response<Employee | BaseResponse>) {
    try {
      const db = await getDb();
      const employee = db.chain
        .get(EMPLOYEE_TABLE)
        .find({ id: Number(req.params.id) })
        .value();

      if (!employee) {
        return res.status(404).json({ success: false, message: 'Employee not found' });
      }
      res.status(200).json({ data: employee, success: true });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async addEmployee(req: Request<any, any, EmployeeSchema, any>, res: Response<Employee | BaseResponse>) {
    try {
      const db = await getDb();
      const employee = req.body;

      const newEmployee: Employee = {
        id: db.chain.get(EMPLOYEE_TABLE).size().value() + 1,
        name: employee.name,
        positions: employee.positions.map((position, positionIndex) => ({
          id: Math.random(),
          displayOrder: positionIndex,
          positionResourceId: Number(position.positionResourceId),
          toolLanguages: position.toolLanguages.map((toolLanguage, toolLanguageIndex) => ({
            id: Math.random(),
            displayOrder: toolLanguageIndex,
            from: Number(toolLanguage.from),
            to: Number(toolLanguage.to),
            description: toolLanguage.description,
            toolLanguageResourceId: Number(toolLanguage.toolLanguageResourceId),
            images: toolLanguage.images.map((_, imageIndex) => ({
              id: Math.random(),
              cdnUrl: 'https://picsum.photos/seed/picsum/600',
              displayOrder: imageIndex,
            })),
          })),
        })),
      };
      db.data?.[EMPLOYEE_TABLE].push(newEmployee);
      await db.write();
      res.status(200).json({ data: newEmployee, success: true });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async updateEmployee(req: Request<any, any, EmployeeSchema, any>, res: Response<Employee | BaseResponse>) {
    try {
      const db = await getDb();
      const employee = req.body;
      const employeeId = Number(req.params.id);
      const employeeIndex = db.chain.get(EMPLOYEE_TABLE).findIndex({ id: employeeId }).value();
      if (employeeIndex === -1) {
        return res.status(404).json({ success: false, message: 'Employee not found' });
      }

      const newEmployee: Employee = {
        id: db.chain.get(EMPLOYEE_TABLE).size().value() + 1,
        name: employee.name,
        positions: employee.positions.map((position, positionIndex) => ({
          id: Math.random(),
          displayOrder: isNaN(Number(position.displayOrder)) ? positionIndex : Number(position.displayOrder),
          positionResourceId: Number(position.positionResourceId),
          toolLanguages: position.toolLanguages.map((toolLanguage, toolLanguageIndex) => ({
            id: Math.random(),
            displayOrder: isNaN(Number(toolLanguage.displayOrder))
              ? toolLanguageIndex
              : Number(toolLanguage.displayOrder),
            from: Number(toolLanguage.from),
            to: Number(toolLanguage.to),
            description: toolLanguage.description,
            toolLanguageResourceId: Number(toolLanguage.toolLanguageResourceId),
            images: toolLanguage.images.map((image, imageIndex) => ({
              id: image?.id ?? Math.random(),
              cdnUrl: 'https://picsum.photos/seed/picsum/600',
              displayOrder: isNaN(Number(image.displayOrder)) ? imageIndex : Number(image.displayOrder),
            })),
          })),
        })),
      };

      db.data?.[EMPLOYEE_TABLE].splice(employeeIndex, 1, newEmployee);
      console.log({ xxx: db.data?.[EMPLOYEE_TABLE] });
      await db.write();
      res.status(200).json({ data: employee, success: true });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async deleteEmployee(req: Request<any, any, any, any>, res: Response<BaseResponse>) {
    try {
      const db = await getDb();
      const employeeId = Number(req.params.id);
      const employeeIndex = db.chain.get(EMPLOYEE_TABLE).findIndex({ id: employeeId }).value();
      if (employeeIndex === -1) {
        return res.status(404).json({ success: false, message: 'Employee not found' });
      }

      db.data?.[EMPLOYEE_TABLE].splice(employeeIndex, 1);
      await db.write();
      res.status(200).json({ success: true });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

EmployeeController.router.get('/', EmployeeController.getEmployees);
EmployeeController.router.post('/', EmployeeController.addEmployee);
EmployeeController.router.put('/:id', EmployeeController.updateEmployee);
EmployeeController.router.delete('/:id', EmployeeController.deleteEmployee);
EmployeeController.router.get('/:id', EmployeeController.getEmployee);
