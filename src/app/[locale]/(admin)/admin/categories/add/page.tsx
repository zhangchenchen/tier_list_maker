import {
  CategoryStatus,
  findCategoryByName,
  insertCategory,
} from "@/models/category";

import Empty from "@/components/blocks/empty";
import FormSlot from "@/components/dashboard/slots/form";
import { Form as FormSlotType } from "@/types/slots/form";
import { getUserInfo } from "@/services/user";
import { getUuid } from "@/lib/hash";

export default async function AddCategoryPage() {
  const user = await getUserInfo();
  if (!user || !user.uuid) {
    return <Empty message="no auth" />;
  }

  const form: FormSlotType = {
    title: "Add Category",
    crumb: {
      items: [
        {
          title: "Categories",
          url: "/admin/categories",
        },
        {
          title: "Add Category",
          is_active: true,
        },
      ],
    },
    fields: [
      {
        name: "title",
        title: "Title",
        type: "text",
        placeholder: "",
        validation: {
          required: true,
        },
      },
      {
        name: "name",
        title: "Name",
        type: "text",
        placeholder: "",
        validation: {
          required: true,
        },
        tip: "category name should be unique",
      },
      {
        name: "status",
        title: "Status",
        type: "select",
        options: Object.values(CategoryStatus).map((status: string) => ({
          title: status,
          value: status,
        })),
        value: CategoryStatus.Created,
        validation: {
          required: true,
        },
      },
      {
        name: "description",
        title: "Description",
        type: "textarea",
        placeholder: "",
      },
      {
        name: "sort",
        title: "Sort",
        type: "number",
        placeholder: "1",
      },
    ],
    submit: {
      button: {
        title: "Submit",
      },
      handler: async (data: FormData, passby: any) => {
        "use server";

        const title = data.get("title") as string;
        const name = data.get("name") as string;
        const status = data.get("status") as string;
        const sort = data.get("sort") as string;
        const description = data.get("description") as string;

        if (
          !title ||
          !title.trim() ||
          !name ||
          !name.trim() ||
          !status ||
          !status.trim() ||
          !sort ||
          !sort.trim()
        ) {
          throw new Error("invalid form data");
        }

        const existCategory = await findCategoryByName(name);
        if (existCategory) {
          throw new Error("category with same name already exists");
        }

        const category = {
          uuid: getUuid(),
          created_at: new Date(),
          status: status as CategoryStatus,
          title,
          name,
          description,
          sort: Number(sort),
        };

        try {
          await insertCategory(category);

          return {
            status: "success",
            message: "Category added",
            redirect_url: "/admin/categories",
          };
        } catch (err: any) {
          throw new Error(err.message);
        }
      },
    },
  };

  return <FormSlot {...form} />;
}
