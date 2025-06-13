import Queue from "bull";
import { get as getConfig } from "queued-web-service/config/index.mjs";
import { updateJobByJobId } from "queued-web-service/models/job.mjs";

export const JobStatus = {
  QUEUED: "queued",
  COMPLETED: "completed",
  FAILED: "failed",
  NOT_FOUND: "not_found",
};

const cfg = getConfig();

const QueueName = "job_queue";

class JobQueue {
  #queue;

  async init() {
    if (this.#queue) return;

    this.#queue = new Queue(QueueName, {
      redis: {
        host: cfg.redis?.host,
        port: cfg.redis?.port,
        db: cfg.redis?.db,
        password: cfg.redis?.password,
      },
      prefix: cfg.redis?.prefix,
    });

    this.#queue.process(async (job) => {
      const { id, data } = job;

      try {
        // await someAlgorism(data);

        // Write result to DB
        await updateJobByJobId(id, {
          status: JobStatus.COMPLETED,
        });

        return [];
      } catch (err) {
        await updateJobByJobId(id, {
          status: JobStatus.FAILED,
        });
        throw err;
      }
    });

    await this.#queue.isReady();
    console.log("Job Queue ready");

    this.#queue.on("error", (err) => console.error("Queue error", err));
    this.#queue.on("waiting", (jobId) => console.log("Waiting", jobId));
    this.#queue.on("active", (job) => console.log("Active", job.id));
    this.#queue.on("completed", (job, ret) => console.log("Done", job.id, ret));
    this.#queue.on("failed", (job, err) =>
      console.error("Failed", job.id, err)
    );
  }

  async addJob(data, delay = cfg.queue?.delayMs ?? 5000) {
    const job = await this.#queue.add(data, { delay });
    return job.id;
  }

  async getJob(id) {
    const job = await this.#queue.getJob(id);
    if (!job) return { status: JobStatus.NOT_FOUND };
    const [state, result] = await Promise.all([
      job.getState(),
      job.returnvalue,
    ]);
    return { status: state, result };
  }

  async close() {
    await this.#queue?.close();
  }
}

export default new JobQueue();
