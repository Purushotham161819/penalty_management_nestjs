import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsDateString,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

// Nested DTO for address validation
class AddressDto {
  @ApiProperty({
    description: 'Street address of the violator',
    example: '1300 W Walnut Hill Ln',
  })
  @IsNotEmpty()
  @IsString()
  street: string;

  @ApiProperty({
    description: 'Apartment number (optional)',
    example: 'Apt 101',
    required: false,
  })
  @IsOptional() // Optional field
  @IsString()
  apartment?: string;

  @ApiProperty({ description: 'City name', example: 'Irving' })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({ description: 'State name', example: 'TX' })
  @IsNotEmpty()
  @IsString()
  state: string;

  @ApiProperty({ description: 'ZIP code', example: '75038' })
  @IsNotEmpty()
  @IsString()
  zipCode: string;
}

// Main DTO for Violator validation
export class AddViolatorDto {
  @ApiProperty({ description: 'Unique ID for the violator', example: 'V12345' })
  @IsNotEmpty()
  @IsString()
  violatorID: string; // Unique field

  @ApiProperty({
    description: 'First Name of the violator',
    example: 'Purushotham',
  })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'Last Name of the violator',
    example: 'Mallepoola',
  })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'Date of Birth of the violator',
    example: '1998-10-02',
  })
  @IsNotEmpty()
  @IsDateString()
  DoB: string; // ISO date format validation

  @ApiProperty({
    description: 'Email ID of the violator',
    example: 'purushotham@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string; // Email format validation

  @ApiProperty({
    description: 'Contact Number of the violator',
    example: '9848022338',
  })
  @IsNotEmpty()
  @IsString()
  contactNumber: string; // Assumes contact number as a string

  @ApiProperty({ description: 'Address of the violator', type: AddressDto })
  @IsNotEmpty()
  @ValidateNested() // Validate nested object fields
  @Type(() => AddressDto) // Transform and validate as AddressDto
  address: AddressDto;
}
