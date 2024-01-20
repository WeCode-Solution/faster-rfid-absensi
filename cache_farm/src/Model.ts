import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize'
import { Sequelize, DataTypes } from 'sequelize'

export type TModel = ReturnType<typeof Models>

interface IEmployee extends Model<InferAttributes<IEmployee>, InferCreationAttributes<IEmployee>> {
  id: CreationOptional<number>
  fullName: string
  nickName: string
  createdAt: Date
  updatedAt: Date
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const Models = (client: Sequelize) => {
  return {
    Employee: client.define<IEmployee>('employee', {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      fullName: {
        type: DataTypes.STRING,
        field: 'full_name'
      },
      nickName: {
        type: DataTypes.STRING,
        field: 'nick_name'
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at'
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at'
      }
    }),

    EmployeeAttendance: client.define('employee_attendance', {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      employee_id: DataTypes.BIGINT,
      recorded_at: DataTypes.TIME,
      created_at: DataTypes.TIME
    })
  }
}
