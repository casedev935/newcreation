import { Controller, Get, Param, Query } from '@nestjs/common';
import { HomiliesService } from './homilies.service';

@Controller('homilies')
export class HomiliesController {
  constructor(private readonly homiliesService: HomiliesService) {}

  @Get()
  findAll(
    @Query('search') search?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('year') year?: string,
  ) {
    const pageNumber = page ? parseInt(page, 10) : 1;
    const limitNumber = limit ? parseInt(limit, 10) : 20;
    return this.homiliesService.findAll(search, pageNumber, limitNumber, year);
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.homiliesService.findBySlug(slug);
  }
}
