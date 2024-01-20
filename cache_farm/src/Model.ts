import { Sequelize, DataTypes } from 'sequelize'

export type TModel = ReturnType<typeof Models>

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const Models = (client: Sequelize) => {
  return {
    Employee: client.define('employee', {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      full_name: DataTypes.STRING,
      nick_name: DataTypes.STRING,
      created_at: DataTypes.TIME
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
