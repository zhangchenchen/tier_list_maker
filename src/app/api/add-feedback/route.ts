import { respData, respErr } from "@/lib/resp";

import { getUserUuid } from "@/services/user";
import { insertFeedback } from "@/models/feedback";

export async function POST(req: Request) {
  try {
    let { content, rating } = await req.json();
    if (!content) {
      return respErr("invalid params");
    }

    const user_uuid = await getUserUuid();

    const feedback = {
      user_uuid: user_uuid,
      content: content,
      rating: rating,
      created_at: new Date(),
      status: "created",
    };

    const dbFeedback = await insertFeedback(feedback);

    return respData(dbFeedback);
  } catch (e) {
    console.log("add feedback failed", e);
    return respErr("add feedback failed");
  }
}
