import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class HomiliesService {
  constructor(private prisma: PrismaService) {}

  async findAll(search?: string, page: number = 1, limit: number = 20, year?: string) {
    const skip = (page - 1) * limit;

    const where: Prisma.HomilyWhereInput = {
      ...(search && {
        title: { contains: search, mode: 'insensitive' },
      }),
      ...(year && { liturgicalYear: year }),
    };

    const [data, total] = await Promise.all([
      this.prisma.homily.findMany({
        where,
        skip,
        take: limit,
        orderBy: [{ datePublished: 'asc' }],
        select: {
          id: true,
          title: true,
          datePublished: true,
          liturgicalYear: true,
          liturgicalSeason: true,
          biblePassage: true,
          slug: true,
          createdAt: true,
        }, // Omitting content to keep list payload light
      }),
      this.prisma.homily.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findBySlug(slug: string) {
    const homily = await this.prisma.homily.findUnique({
      where: { slug },
    });

    if (!homily) {
      throw new NotFoundException(`Homily with slug ${slug} not found`);
    }

    return homily;
  }
}
