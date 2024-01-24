import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize'
import { Sequelize, DataTypes } from 'sequelize'

export type TModel = ReturnType<typeof Models>

interface IEmployeeAttendance extends Model<InferAttributes<IEmployeeAttendance>, InferCreationAttributes<IEmployeeAttendance>> {
  id: CreationOptional<number>
  employeeId: number
  recordedAt: Date
  createdAt: Date
  updatedAt: Date
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const Models = (client: Sequelize) => {
  return {
    EmployeeAttendance: client.define<IEmployeeAttendance>('employee_attendance', {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      employeeId: {
        type: DataTypes.BIGINT,
        field: 'employee_id'
      },
      recordedAt: {
        type: DataTypes.DATE,
        field: 'recorded_at'
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at'
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at'
      }
    })
  }
}
