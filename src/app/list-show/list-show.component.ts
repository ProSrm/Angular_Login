import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { 
  ColDef, 
  GridReadyEvent, 
  CellClickedEvent, 
  GridApi,
  ClientSideRowModelModule, 
  ModuleRegistry
} from 'ag-grid-community';


ModuleRegistry.registerModules([ClientSideRowModelModule]);

@Component({
  selector: 'app-list-show',
  standalone: true,
  imports: [CommonModule, FormsModule, AgGridModule],
  templateUrl: './list-show.component.html',
  styleUrls: ['./list-show.component.css']
})
export class ListShowComponent implements OnInit {
  items: any[] = [];
  gridApi!: GridApi;
  showEditModal = false;
  editingItem: any = {};
  
  
  rowData: any[] = [];
  
  columnDefs: ColDef[] = [
    { field: 'id', headerName: 'ID', sortable: true, filter: true, width: 70 },
    { field: 'firstName', headerName: 'Name', sortable: true, filter: true },
    { field: 'email', headerName: 'Email', sortable: true, filter: true },
    {
      headerName: 'Actions',
      cellRenderer: (params: any) => {
        const div = document.createElement('div');
        
        const editBtn = document.createElement('button');
        editBtn.innerHTML = 'Edit';
        editBtn.className = 'text-indigo-600 hover:text-indigo-900 mr-4';
        editBtn.addEventListener('click', () => this.startEditing(params.data));
        
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = 'Delete';
        deleteBtn.className = 'text-red-600 hover:text-red-900';
        deleteBtn.addEventListener('click', () => this.deleteItem(params.data.id));
        
        div.appendChild(editBtn);
        div.appendChild(deleteBtn);
        return div;
      }
    }
  ];
  
  defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true
  };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  onCellClicked(event: CellClickedEvent) {
    console.log('Cell was clicked', event);
  }

  fetchUsers(): void {
    this.http.get<any[]>('https://localhost:7067/api/layer/users').subscribe(
      (data) => {
        // Update both properties for safety
        this.items = data;
        this.rowData = [...data];
        
        console.log('Data fetched:', data);
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  startEditing(item: any): void {
    this.editingItem = { ...item }; 
    this.showEditModal = true;
  }

  cancelEdit(): void {
    this.showEditModal = false;
  }

  saveChanges(item: any): void {
    this.showEditModal = false;
    this.http.put('https://localhost:7067/api/layer/update', item).subscribe(
      (response: any) => {
        console.log('User updated:', response);
        alert('User updated successfully!');
        this.fetchUsers(); 
      },
      (error) => {
        console.error('Error updating user:', error);
        alert('Failed to update user.');
      }
    );
  }

  deleteItem(itemId: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this item?');
    if (confirmDelete) {
      this.http.delete(`https://localhost:7067/api/layer/delete/${itemId}`).subscribe(
        (response: any) => {
          console.log('User deleted:', response);
          alert('User deleted successfully!');
          this.fetchUsers(); 
          this.items = this.items.filter(item => item.id !== itemId);
          this.rowData = [...this.items];
        },
        (error) => {
          console.error('Error deleting user:', error);
          alert('Failed to delete user.');
        }
      );
    }
  }
}