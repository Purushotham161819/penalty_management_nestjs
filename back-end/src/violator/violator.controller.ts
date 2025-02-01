import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { ViolatorService } from './violator.service';
import { Violator } from './violator.schema';
import { AddViolatorDto } from './dto/add-violator.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import * as xlsx from 'xlsx';

@ApiTags('Violator') // Group endpoints under "Violator" in Swagger UI
@Controller('violator') // Base route: /violator
export class ViolatorController {
  constructor(private readonly violatorService: ViolatorService) {}

  // API to add a new violator
  @Post('add') // Endpoint: POST /violator/add
  @ApiOperation({ summary: 'Add a new violator' }) // Short description of the endpoint
  @ApiResponse({
    status: 201,
    description: 'Violator added successfully.',
    type: Violator,
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async addViolator(
    @Body() violatorData: AddViolatorDto,
  ): Promise<{ message: string; data: Violator }> {
    return this.violatorService.addViolator(violatorData); // Call the updated service method
  }

  @Get('get/:id')
  @ApiOperation({ summary: 'Get violator by Id' })
  @ApiResponse({
    status: 200,
    description: 'Violator retrieved successfully',
    schema: {
      example: {
        message: 'Violator retrieved successfully',
        data: {
          _id: '678ac08bd33b86b101007872',
          violatorID: 'V12345',
          firstName: 'John',
          lastName: 'Doe',
          DoB: '1990-05-15T00:00:00.000Z',
          email: 'johndoe@example.com',
          contactNumber: '1234567890',
          address: {
            street: '123 Elm Street',
            apartment: 'Apt 101',
            city: 'Springfield',
            state: 'IL',
            zipCode: '62704',
            _id: '678ac08bd33b86b101007873',
          },
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Invalid ID format',
    schema: {
      example: {
        statusCode: 400,
        message: 'Invalid ID format: 12345',
        error: 'Bad Request',
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Violator not found',
    schema: {
      example: {
        statusCode: 404,
        message: 'Violator with id 60f7180c2f4e4b3b60a4d3c5 not found',
        error: 'Not Found',
      },
    },
  })
  @ApiInternalServerErrorResponse({
    description: 'Unexpected error occurred',
    schema: {
      example: {
        statusCode: 500,
        message:
          'An unexpected error occurred while retrieving the violator: Some error details',
        error: 'Internal Server Error',
      },
    },
  })
  async getVioator(
    @Param('id') id: string,
  ): Promise<{ message: string; data: Violator }> {
    return this.violatorService.getViolator(id);
  }

  // API Get all violators at a time

  @Get('get-all')
  async getAllViolators(): Promise<{ message: string; data: Violator[] }> {
    // Await the result from the service
    const violators = await this.violatorService.getAllViolators();
    return { message: 'All violators fetched successfully', data: violators };
  }

  // API to Delete a violator

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete violator by Id' })
  @ApiResponse({
    status: 200,
    description: 'Violator deleted successfully',
  })
  @ApiNotFoundResponse({
    description: 'Violator not found',
    schema: {
      example: {
        statusCode: 404,
        message: 'Violator with id 60f7180c2f4e4b3b60a4d3c5 not found',
        error: 'Not Found',
      },
    },
  })
  @ApiInternalServerErrorResponse({
    description: 'Unexpected error occurred',
    schema: {
      example: {
        statusCode: 500,
        message:
          'An unexpected error occurred while deleting the violator: Some error details',
        error: 'Internal Server Error',
      },
    },
  })
  async deleteViolator(
    @Param('id') id: string,
  ): Promise<{ message: string; data: Violator }> {
    return this.violatorService.deleteViolator(id);
  }

  @Post('bulk-add')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Add Bulk Violators' }) // Summary of the endpoint
  @ApiConsumes('multipart/form-data') // Specifies that this endpoint accepts multipart/form-data
  @ApiBody({
    description: 'Excel file containing bulk violator data',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary', // File upload format
        },
      },
    },
  })
  async addBulkViolators(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<{ message: string }> {
    if (!file) {
      throw new Error('File not uploaded!');
    }
    try {
      // Step 1: Parse the Excel file using xlsx
      const workbook = xlsx.read(file.buffer, { type: 'buffer' }); // Read Excel file from buffer
      const sheetName = workbook.SheetNames[0]; // Use the first sheet
      const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]); // Convert sheet to JSON
      console.log('Parsed Excel Data:', sheetData);
      // Step 2: Pass parsed data to the service for database insertion
      await this.violatorService.addBulkViolators(sheetData);

      return {
        message: 'Bulk Violators Added Successfully',
      };
    } catch (error) {
      console.error('Error processing file:', error.message);
      throw new BadRequestException(error.message);
    }
  }
}
