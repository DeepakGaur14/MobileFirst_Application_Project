import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ToasterService } from '../core/toastr.service';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-add-edit',
  templateUrl: './task-add-edit.component.html',
  styleUrls: ['./task-add-edit.component.css']
})
export class TaskAddEditComponent implements OnInit {
  taskForm: FormGroup;
  status: string[] = [
    'Complete',
    'Pending',
  ];
  isSubmitted:boolean = false;
  constructor(private fb: FormBuilder, private tasksService: TaskService,
    private dialogref: MatDialogRef<TaskAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private toastr:ToasterService) {
    this.taskForm = this.fb.group({
      Task: ['', [Validators.required]],
      DatePick: ['', [Validators.required]],
      taskstatus: ['',[Validators.required]]
    });
  }

  ngOnInit(): void {
    this.taskForm.patchValue(this.data);
  }

  OnFormSubmit() {
    this.isSubmitted = true;
    if (this.taskForm.valid) {
      if(this.data){
      return this.tasksService.updateTasks(this.data.id, this.taskForm.value).subscribe({
        next: (val: any) => {
          this.toastr.showSuccess('Successfully Updated ', 'Success');
          this.dialogref.close(true);
        },
      });
    } 
    
    else {
      return this.tasksService.addTasks(this.taskForm.value).subscribe({
        next: (val: any) => {
          this.toastr.showSuccess('Successfully Added ', 'Success');
          this.dialogref.close(true);
        },
      });
    }
  }

  }

}
