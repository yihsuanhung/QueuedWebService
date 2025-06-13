/**
 * @openapi
 * /api/queued-jobs:
 *   post:
 *     summary: Create a queued job
 *     tags: [queued]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *                 example: "simon"
 *     responses:
 *       202:
 *         description: Job accepted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 jobId:
 *                   type: string
 *                   example: "1"
 */

/**
 * @openapi
 * /api/queued-jobs/{id}:
 *   get:
 *     summary: Get job status / result
 *     tags: [queued]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "1"
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "completed"
 *                 result:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["cat", "dog"]
 *                 name:
 *                   type: string
 *                   example: "simon"
 *       404:
 *         description: Job not found
 */
