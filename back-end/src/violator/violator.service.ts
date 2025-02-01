import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Violator } from './violator.schema';
import { AddViolatorDto } from './dto/add-violator.dto';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class ViolatorService {
  constructor(
    @InjectModel(Violator.name) private readonly violatorModel: Model<Violator>,
  ) {}

  // Function to Add a violator
  async addViolator(
    violatorData: AddViolatorDto,
  ): Promise<{ message: string; data: Violator }> {
    try {
      const newViolator = new this.violatorModel(violatorData);
      const savedViolator = await newViolator.save(); // Save the violator to the database
      return {
        message: 'Violator added successfully',
        data: savedViolator, // Include the saved violator data
      };
    } catch (error) {
      // Handle known Mongoose validation errors
      if (error.name === 'ValidationError') {
        throw new BadRequestException(`Validation Error: ${error.message}`);
      }

      // Handle unique constraint violations (e.g., duplicate `violatorID`)
      if (error.code === 11000) {
        throw new BadRequestException(
          'Duplicate key error: ViolatorID must be unique.',
        );
      }

      // Log unexpected errors for debugging
      console.error('Unexpected error in addViolator:', error);

      // Throw a generic internal server error for unexpected issues
      throw new InternalServerErrorException(
        'An unexpected error occurred while adding the violator.',
      );
    }
  }

  // Fuction to get violator by Id
  async getViolator(id: string): Promise<{ message: string; data: Violator }> {
    try {
      if (!id || id.trim() === '') {
        throw new BadRequestException('Violator ID is required.');
      }
      const violator = await this.violatorModel.findById(id);
      if (!violator) {
        throw new NotFoundException(`Violator with id ${id} not found`);
      }
      return {
        message: 'Violator retriedved successfully',
        data: violator,
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error; // Re-throw known exceptions to be handled by NestJS
      } else if (error.name === 'CastError' && error.kind === 'ObjectId') {
        // Handle invalid ObjectIds (e.g., malformed IDs)
        throw new BadRequestException(`Invalid Violator ID format: "${id}".`);
      } else if (error.name === 'ValidationError') {
        // Handle Mongoose validation errors (if any are possible on findById)
        throw new InternalServerErrorException(
          `Validation Error: ${error.message}`,
        );
      } else if (error.name === 'MongoServerError' && error.code === 11000) {
        // Handle duplicate key errors (if any are possible on findById)
        throw new InternalServerErrorException(
          `Duplicate key error: ${error.message}`,
        );
      } else {
        // Log unexpected errors for debugging (including the full error object)
        console.error('Unexpected error retrieving violator:', error);
        throw new InternalServerErrorException(
          'An unexpected error occurred while retrieving the violator. Please try again later.',
        );
      }
    }
  }

  // Function to delete a violator by Id
  async deleteViolator(
    id: string,
  ): Promise<{ message: string; data: Violator }> {
    try {
      if (!id || id.trim() === '') {
        throw new NotFoundException('Violator ID is required.');
      }
      const deletedViolator = await this.violatorModel.findByIdAndDelete(id);
      if (!deletedViolator) {
        throw new NotFoundException(`Violator with ID "${id}" not found.`);
      }
      return {
        message: 'violator deleted successfully',
        data: deletedViolator,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // Re-throw NotFoundException to be handled by NestJS
      } else if (error.name === 'CastError' && error.kind === 'ObjectId') {
        // Handle invalid ObjectIds (e.g., malformed IDs)
        throw new NotFoundException(`Invalid Violator ID format: "${id}".`);
      } else if (error.name === 'ValidationError') {
        // Handle Mongoose validation errors
        throw new InternalServerErrorException(
          `Validation Error: ${error.message}`,
        );
      } else if (error.name === 'MongoServerError' && error.code === 11000) {
        // Handle duplicate key errors
        throw new InternalServerErrorException(
          `Duplicate key error: ${error.message}`,
        );
      } else {
        // Log the error for debugging purposes
        console.error('Error deleting violator:', error);
        // Generic error handling for unexpected errors
        throw new InternalServerErrorException(
          'Failed to delete violator. Please try again later.',
        );
      }
    }
  }

  // Funation to add bulk violators
  async addBulkViolators(data: any[]): Promise<void> {
    console.log('Received data in addBulkViolators:', data);
    // Step 1: Transform and validate data (if needed)
    const bulkViolators = data.map((record) => ({
      violatorID: record['violatorID'],
      firstName: record['firstName'],
      lastName: record['lastName'],
      DoB: record['DoB'],
      email: record['email'],
      contactNumber: record['contactNumber'],
      address: {
        street: record['address.street'],
        apartment: record['address.apartment'],
        city: record['address.city'],
        state: record['address.state'],
        zipCode: record['address.zipCode'],
      },
    }));
    console.log('Transformed Data:', bulkViolators);
    // Step 2: Insert the data into the database
    await this.violatorModel.insertMany(bulkViolators);
  }

  // Function to get all violatirors
  async getAllViolators(): Promise<Violator[]> {

    return await this.violatorModel.find();
  }
}
