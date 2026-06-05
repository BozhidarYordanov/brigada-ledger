## Project

**Brigada Ledger** is a mobile-first SaaS web app for small companies/brigades to track:

- daily employee attendance
- daily wages
- expenses
- income
- monthly reports

This is not a full accounting system. It is a simple operational ledger for business owners and crew managers.

Core rule:

```txt
If an employee has a work entry for a date, they worked that day.
If there is no work entry, they were absent.
```

---

## Tech Stack

Use:

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Neon PostgreSQL
- Drizzle ORM
- Drizzle Kit migrations
- Clerk for authentication

Use Server Actions for app mutations. Use Route Handlers only when an API is actually needed.

Do not access the database from Client Components.

---

## Architecture

Use this flow for all mutations:

```txt
UI -> Server Action -> Zod validation -> auth check -> organization access check -> Drizzle query
```

The app is multi-tenant.

Every business record must belong to an organization directly or indirectly.

Never trust `organizationId` from the client without checking that the current user is a member of that organization.

---

## Main Data Model

Required tables:

```txt
users
organizations
organization_members
employees
work_days
work_entries
expense_categories
expenses
incomes
payroll_payments
```

Relationships:

```txt
users <-> organizations through organization_members
organizations -> employees
organizations -> work_days
work_days -> work_entries
employees -> work_entries
organizations -> expenses
organizations -> incomes
employees -> payroll_payments
```

Important data rules:

- Employees are not auth users.
- Employees should be archived, not hard deleted.
- `employees.default_daily_wage` is only a default value.
- The actual wage for a specific date must be stored in `work_entries.daily_wage`.
- One organization can have only one `work_day` per date.
- One employee can have only one `work_entry` per work day.
- Money fields must use decimal/numeric types, not floating point.
- Expenses and income are separate records.
- Food and fuel are expense categories, not hardcoded columns.

---

## Core Tables

### organizations

```txt
id
name
currency
created_at
updated_at
```

### organization_members

```txt
id
organization_id
user_id
role: owner | manager | viewer
created_at
```

### employees

```txt
id
organization_id
full_name
phone
default_daily_wage
notes
is_active
archived_at
created_at
updated_at
```

### work_days

```txt
id
organization_id
work_date
notes
created_by
created_at
updated_at
```

Unique:

```txt
organization_id + work_date
```

### work_entries

```txt
id
work_day_id
employee_id
daily_wage
hours_worked
note
created_at
updated_at
```

Unique:

```txt
work_day_id + employee_id
```

### expenses

```txt
id
organization_id
expense_date
category_id
amount
description
paid_by
created_by
created_at
updated_at
```

### incomes

```txt
id
organization_id
income_date
amount
source
description
payment_method
created_by
created_at
updated_at
```

### payroll_payments

```txt
id
organization_id
employee_id
payment_date
period_start
period_end
amount
note
created_by
created_at
```

---

## Pages

Protected app pages:

```txt
/dashboard
/days
/days/[date]
/employees
/employees/[id]
/expenses
/expenses/new
/income
/income/new
/reports
/settings
```

Public pages:

```txt
/login
/register
```

---

## UX Rules

The app must be mobile-first.

Most users will use it from phones.

Prefer:

- cards over wide tables on mobile
- large tap targets
- short forms
- clear primary buttons
- bottom navigation on mobile
- sidebar navigation on desktop
- fast daily entry flow

Daily work report UX:

- select date
- show active employees
- toggle whether each employee worked
- auto-fill default daily wage
- allow editing the daily wage
- add food/fuel/other expenses quickly
- save the day

Do not recreate the Excel spreadsheet as a giant web table.

---

## Navigation

Mobile bottom nav:

```txt
Today
Reports
Add
Workers
More
```

Desktop sidebar:

```txt
Dashboard
Daily Reports
Employees
Expenses
Income
Reports
Settings
```

---

## Reports

Monthly reports must include:

- worked days per employee
- total earned wage per employee
- total expenses by category
- total income
- monthly balance

Monthly balance:

```txt
total_income - total_expenses - total_earned_wages
```

---

## Code Guidelines

Use English in code.

Use Bulgarian for visible UI labels.

Use consistent terms:

```txt
organization
employee
workDay
workEntry
dailyWage
expense
income
report
```

Avoid mixing terms like worker/employee or salary/wage.

Keep code simple and maintainable. Do not over-engineer the MVP.

---

## MVP Order

Build in this order:

1. Project setup
2. Database schema and migrations
3. Authentication
4. Organization onboarding
5. Employees CRUD
6. Daily work reports
7. Expenses
8. Income
9. Monthly reports
10. Mobile UI polish

Do not build these in MVP unless explicitly requested:

- native mobile app
- invoices
- tax reports
- bank integrations
- OCR receipts
- advanced payroll rules
- offline sync
- PDF export