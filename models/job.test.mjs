import { jest } from "@jest/globals";
import mongoose from "mongoose";
import crypto from "node:crypto";

import * as JobModel from "./job.mjs";

describe("Job Model", () => {
  beforeAll(async () => {
    const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
    await mongoose.connect(uri, {
      dbName: "queued-web-service-test",
      directConnection: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    await mongoose.connection.collection("job").deleteMany({});
  });

  it("creates and reads a job", async () => {
    const jobId = crypto.randomUUID();
    await JobModel.createJob(jobId, "simon");

    const doc = await JobModel.getJobByJobId(jobId);

    expect(doc).toBeTruthy();
    expect(doc.job_id).toBe(jobId);
    expect(doc.name).toBe("simon");
  });

  it("updates status & result", async () => {
    const jobId = crypto.randomUUID();
    await JobModel.createJob(jobId, "simon");

    const updated = await JobModel.updateJobByJobId(jobId, {
      status: "completed",
    });

    expect(updated.status).toBe("completed");

    // ensure persisted
    const fromDb = await JobModel.getJobByJobId(jobId);
    expect(fromDb.status).toBe("completed");
  });

  it("throws validation error for bad create", async () => {
    await expect(JobModel.createJob("id1", "")).rejects.toHaveProperty(
      "name",
      "ValidationError"
    );
  });
});
