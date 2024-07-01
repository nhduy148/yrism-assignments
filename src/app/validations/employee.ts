import { isNil, isString } from 'lodash-es';
import { EmployeeSchema, PositionSchema, ToolLanguageSchema } from 'shared/types';
import * as Yup from 'yup';

const yupFile = Yup.mixed().test('required', 'Invalid file', (file: any) => {
  if (isString(file)) return true;
  if (isNil(file)) return true;
  return file instanceof File;
});

// @ts-expect-error typescript error
export const dataImageSchema: Yup.ObjectSchema<DataImageSchema> = Yup.object().shape({
  data: yupFile,
  displayOrder: Yup.number().required(),
});

export const toolLanguageSchema: Yup.ObjectSchema<ToolLanguageSchema> = Yup.object().shape({
  toolLanguageResourceId: Yup.number().required('Tool/Language is required'),
  displayOrder: Yup.number().required(),
  from: Yup.number()
    .required('From date is required')
    .max(Yup.ref('to'), 'From date must be less than or equal to To date'),
  to: Yup.number()
    .required('To date is required')
    .min(Yup.ref('from'), 'To date must be greater than or equal to From date'),
  description: Yup.string().optional(),
  images: Yup.array().of(dataImageSchema).required('At least one image is required'),
});

export const positionSchema: Yup.ObjectSchema<PositionSchema> = Yup.object().shape({
  positionResourceId: Yup.number().required('Position is required'),
  displayOrder: Yup.number().required(),
  toolLanguages: Yup.array()
    .of(toolLanguageSchema)
    .required('At least one tool/language is required')
    .min(1, 'At least one tool/language is required'),
});

export const employeeSchema: Yup.ObjectSchema<EmployeeSchema> = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  positions: Yup.array()
    .of(positionSchema)
    .required('At least one position is required')
    .min(1, 'At least one position is required')
    .test('unique-positions', 'Position must be unique', (value) => {
      const positionIds = value.map((position) => position.positionResourceId);
      return new Set(positionIds).size === positionIds.length;
    }),
});

// Sample usage
// const employeeData = {
//   id: 1,
//   name: 'John Doe',
//   positions: [
//     {
//       id: 1,
//       positionResourceId: 101,
//       displayOrder: 1,
//       toolLanguages: [
//         {
//           id: 1,
//           toolLanguageResourceId: 201,
//           displayOrder: 1,
//           from: 2020,
//           to: 2022,
//           description: 'Frontend development using ReactJS',
//           images: [
//             {
//               id: 1,
//               cdnUrl: 'https://example.com/image1.jpg',
//               displayOrder: 1,
//             },
//           ],
//         },
//       ],
//     },
//   ],
// };
