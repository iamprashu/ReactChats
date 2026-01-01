import cron from "node-cron";
import { prisma } from "../../config/prismaConfig";

export function startSessionCleanupJob() {
  cron.schedule("0 20 * * *", async () => {
    await prisma.session.deleteMany({
      where: {
        OR: [{ expiresAt: { lt: new Date() } }, { isRevoked: true }],
      },
    });
    console.log("done");
  });
}
