import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Queue } from 'bullmq';
import { ProviderDispatchOutbox } from '@transactions/models';
import { PROVIDER_DISPATCH_QUEUE_NAME } from './provider-dispatch.constants';

@Injectable()
export class ProviderDispatchQueueService implements OnModuleDestroy {
  private queue?: Queue;

  async enqueue(outbox: ProviderDispatchOutbox): Promise<void> {
    await this.getQueue().add(outbox.jobName, outbox.payload, {
      jobId: outbox.transactionId,
      removeOnComplete: false,
      removeOnFail: false,
    });
  }

  async onModuleDestroy(): Promise<void> {
    await this.queue?.close();
  }

  private getQueue(): Queue {
    if (!this.queue) {
      this.queue = new Queue(PROVIDER_DISPATCH_QUEUE_NAME, {
        connection: {
          host: process.env.REDIS_HOST ?? 'localhost',
          port: Number(process.env.REDIS_PORT ?? '6379'),
          connectTimeout: 1000,
          maxRetriesPerRequest: 1,
        },
      });
      this.queue.on('error', () => undefined);
    }

    return this.queue;
  }
}
