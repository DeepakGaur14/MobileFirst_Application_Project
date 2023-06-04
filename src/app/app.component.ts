import { Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ToasterService } from './core/toastr.service';
import { TaskService } from './services/task.service';
import { TaskAddEditComponent } from './task-add-edit/task-add-edit.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Task_Management_System';
  displayedColumns: string[] = ['id', 'Task', 'DatePick', 'taskstatus', 'Action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private dialog:MatDialog, private taskservice:TaskService, private toastr:ToasterService) {}
  openAddEditTaskForm(){
    const dialogRef = this.dialog.open(TaskAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) =>{
        if(val) {
          this.getTasksList();
        }
      },
      
      error(err){
        console.log(err);
      }
    })
  }

  ngOnInit(): void {
    this.getTasksList();
  }
  
  getTasksList(){
    this.taskservice.getTasksList().subscribe({
      next: (res:any) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      
      error(err) {
        console.log(err);
      },
    })
  }

  deleteFromTaskList(id:number){
    this.taskservice.deleteFromTaskList(id).subscribe({
      next: (res) => {
        this.toastr.showSuccess('Successfully Logged In ', 'Success');
        this.getTasksList();
      },
      error(err){
        console.log(err);
      }
    })
  }

  openEditTask(data:any){
   const dialogRef = this.dialog.open(TaskAddEditComponent,{
      data: data
    });

    dialogRef.afterClosed().subscribe({
      next: (val) =>{
        if(val) {
          this.getTasksList();
        }
      },
    });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
