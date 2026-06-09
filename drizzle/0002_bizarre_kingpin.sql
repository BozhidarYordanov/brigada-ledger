CREATE TABLE "work_days" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"work_date" date NOT NULL,
	"notes" text,
	"created_by" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "work_days_organization_id_work_date_unique" UNIQUE("organization_id","work_date")
);
--> statement-breakpoint
CREATE TABLE "work_entries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"work_day_id" uuid NOT NULL,
	"employee_id" uuid NOT NULL,
	"daily_wage" numeric(12, 2) NOT NULL,
	"hours_worked" numeric(5, 2),
	"note" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "work_entries_work_day_id_employee_id_unique" UNIQUE("work_day_id","employee_id")
);
--> statement-breakpoint
ALTER TABLE "work_days" ADD CONSTRAINT "work_days_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "work_days" ADD CONSTRAINT "work_days_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "work_entries" ADD CONSTRAINT "work_entries_work_day_id_work_days_id_fk" FOREIGN KEY ("work_day_id") REFERENCES "public"."work_days"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "work_entries" ADD CONSTRAINT "work_entries_employee_id_employees_id_fk" FOREIGN KEY ("employee_id") REFERENCES "public"."employees"("id") ON DELETE no action ON UPDATE no action;