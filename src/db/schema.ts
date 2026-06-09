import { relations } from "drizzle-orm";
import {
  boolean,
  date,
  numeric,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  authProviderId: text("auth_provider_id").notNull().unique(),
  email: text("email").notNull(),
  name: text("name"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const organizations = pgTable("organizations", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  currency: text("currency").notNull().default("BGN"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const organizationMembers = pgTable(
  "organization_members",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id),
    role: text("role").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => [
    unique("organization_members_organization_id_user_id_unique").on(
      table.organizationId,
      table.userId,
    ),
  ],
);

export const employees = pgTable("employees", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id")
    .notNull()
    .references(() => organizations.id),
  fullName: text("full_name").notNull(),
  phone: text("phone"),
  defaultDailyWage: numeric("default_daily_wage", {
    precision: 12,
    scale: 2,
  }),
  notes: text("notes"),
  isActive: boolean("is_active").notNull().default(true),
  archivedAt: timestamp("archived_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const workDays = pgTable(
  "work_days",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id),
    workDate: date("work_date").notNull(),
    notes: text("notes"),
    createdBy: uuid("created_by").references(() => users.id),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [
    unique("work_days_organization_id_work_date_unique").on(
      table.organizationId,
      table.workDate,
    ),
  ],
);

export const workEntries = pgTable(
  "work_entries",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    workDayId: uuid("work_day_id")
      .notNull()
      .references(() => workDays.id, { onDelete: "cascade" }),
    employeeId: uuid("employee_id")
      .notNull()
      .references(() => employees.id),
    dailyWage: numeric("daily_wage", { precision: 12, scale: 2 }).notNull(),
    hoursWorked: numeric("hours_worked", { precision: 5, scale: 2 }),
    note: text("note"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [
    unique("work_entries_work_day_id_employee_id_unique").on(
      table.workDayId,
      table.employeeId,
    ),
  ],
);

export const expenseCategories = pgTable("expense_categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id").references(() => organizations.id),
  name: text("name").notNull(),
  type: text("type").notNull(),
  isDefault: boolean("is_default").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const expenses = pgTable("expenses", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id")
    .notNull()
    .references(() => organizations.id),
  expenseDate: date("expense_date").notNull(),
  categoryId: uuid("category_id").references(() => expenseCategories.id),
  amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
  description: text("description"),
  paidBy: text("paid_by"),
  createdBy: uuid("created_by").references(() => users.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const incomes = pgTable("incomes", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id")
    .notNull()
    .references(() => organizations.id),
  incomeDate: date("income_date").notNull(),
  amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
  source: text("source"),
  description: text("description"),
  paymentMethod: text("payment_method"),
  createdBy: uuid("created_by").references(() => users.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const payrollPayments = pgTable("payroll_payments", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id")
    .notNull()
    .references(() => organizations.id),
  employeeId: uuid("employee_id")
    .notNull()
    .references(() => employees.id),
  paymentDate: date("payment_date").notNull(),
  periodStart: date("period_start"),
  periodEnd: date("period_end"),
  amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
  note: text("note"),
  createdBy: uuid("created_by").references(() => users.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  organizationMembers: many(organizationMembers),
  createdWorkDays: many(workDays),
  createdExpenses: many(expenses),
  createdIncomes: many(incomes),
  createdPayrollPayments: many(payrollPayments),
}));

export const organizationsRelations = relations(organizations, ({ many }) => ({
  organizationMembers: many(organizationMembers),
  employees: many(employees),
  workDays: many(workDays),
  expenseCategories: many(expenseCategories),
  expenses: many(expenses),
  incomes: many(incomes),
  payrollPayments: many(payrollPayments),
}));

export const organizationMembersRelations = relations(
  organizationMembers,
  ({ one }) => ({
    organization: one(organizations, {
      fields: [organizationMembers.organizationId],
      references: [organizations.id],
    }),
    user: one(users, {
      fields: [organizationMembers.userId],
      references: [users.id],
    }),
  }),
);

export const employeesRelations = relations(employees, ({ many, one }) => ({
  organization: one(organizations, {
    fields: [employees.organizationId],
    references: [organizations.id],
  }),
  workEntries: many(workEntries),
  payrollPayments: many(payrollPayments),
}));

export const workDaysRelations = relations(workDays, ({ many, one }) => ({
  organization: one(organizations, {
    fields: [workDays.organizationId],
    references: [organizations.id],
  }),
  createdByUser: one(users, {
    fields: [workDays.createdBy],
    references: [users.id],
  }),
  workEntries: many(workEntries),
}));

export const workEntriesRelations = relations(workEntries, ({ one }) => ({
  workDay: one(workDays, {
    fields: [workEntries.workDayId],
    references: [workDays.id],
  }),
  employee: one(employees, {
    fields: [workEntries.employeeId],
    references: [employees.id],
  }),
}));

export const expenseCategoriesRelations = relations(
  expenseCategories,
  ({ many, one }) => ({
    organization: one(organizations, {
      fields: [expenseCategories.organizationId],
      references: [organizations.id],
    }),
    expenses: many(expenses),
  }),
);

export const expensesRelations = relations(expenses, ({ one }) => ({
  organization: one(organizations, {
    fields: [expenses.organizationId],
    references: [organizations.id],
  }),
  category: one(expenseCategories, {
    fields: [expenses.categoryId],
    references: [expenseCategories.id],
  }),
  createdByUser: one(users, {
    fields: [expenses.createdBy],
    references: [users.id],
  }),
}));

export const incomesRelations = relations(incomes, ({ one }) => ({
  organization: one(organizations, {
    fields: [incomes.organizationId],
    references: [organizations.id],
  }),
  createdByUser: one(users, {
    fields: [incomes.createdBy],
    references: [users.id],
  }),
}));

export const payrollPaymentsRelations = relations(
  payrollPayments,
  ({ one }) => ({
    organization: one(organizations, {
      fields: [payrollPayments.organizationId],
      references: [organizations.id],
    }),
    employee: one(employees, {
      fields: [payrollPayments.employeeId],
      references: [employees.id],
    }),
    createdByUser: one(users, {
      fields: [payrollPayments.createdBy],
      references: [users.id],
    }),
  }),
);
