import { HttpStatus, Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { BadRequestException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('ProductService')
  
  onModuleInit() {
    //throw new Error('Method not implemented.');
    this.$connect
    this.logger.log('Database connected with Prisma')
  }

  create(createProductDto: CreateProductDto) {
    
    return this.product.create({                                   // product del prisma client model Product
      data: createProductDto
      //data: {
      //  name: "telefono",
      //  price: 100
      //}

    })
  }

  async findAll( paginationDto: PaginationDto ) {
    
    const { page, limit } = paginationDto
    
    const totalProducts = await this.product.count({ where: { available: true }})

    const lastPage = Math.ceil( totalProducts / limit )

    if( page > lastPage && totalProducts > 0 ) {
      throw new BadRequestException(`La página solicitada (${ page }) excede el número total de páginas (${ lastPage })`)
    }

    return {
      data: await this.product.findMany({
        skip: ( page - 1 ) * limit,          
        take: limit       // take    ->   cantidad de registro en Prisma
        , where: {
          available: true
        }
      }),
      meta: {
        page: page,
        totalProducts: totalProducts,
        lastPage: lastPage,
      }
    }
  }

  async findOne(id: number) {
    const product = this.product.findFirst({
      where: { id: id, available: true }
    })

    if( !product ) {
      throw new RpcException({
        message: `Product with id #${ id } not found`,
        status: HttpStatus.BAD_REQUEST,
      })
        
    }

    return product
  }

  async update(id: number, updateProductDto: UpdateProductDto) {

    const { id: __id, ...data } = updateProductDto 
    
    await this.findOne( id )

    return this.product.update({
      where: { id: id },
      data: data
    })
  
  }

  async remove(id: number) {

    await this.findOne(id);

    //return this.product.delete({
    //  where: { id: id }
    //});

    const product = await this.product.update({
      where: { id: id },
      data: {
        available: false
      }
    })

    return product

  }

  async validateProducts ( ids: number[] ) {
    ids: Array.from(new Set(ids));

    const products = await this.product.findMany({
      where: {
        id: {
          in: ids
        }
      }
    })

    if( products.length !== ids.length ) {
      throw new RpcException({
        Message:`Some products were not found`,
        status: HttpStatus.BAD_REQUEST,
      })
    }

    return products;
  }

}
