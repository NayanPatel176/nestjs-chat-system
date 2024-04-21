import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './service/student.service';
import { Student, StudentSchema } from './schema/student.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
