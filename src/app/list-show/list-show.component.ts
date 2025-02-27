import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list-show',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list-show.component.html',
  styleUrls: ['./list-show.component.css']
})
export class ListShowComponent implements OnInit {
  items: any[] = [];
  editingItemId: number | null = null;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchUsers();
  }


  fetchUsers(): void {
    this.http.get<any[]>('https://localhost:7067/api/layer/users').subscribe(
      (data) => {
        this.items = data;
        console.log(data)
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }


  startEditing(itemId: number): void {
    this.editingItemId = itemId;
  }


  saveChanges(item: any): void {
    this.editingItemId = null;


    this.http.put('https://localhost:7067/api/layer/update', item).subscribe(
      (response: any) => {
        console.log('User updated:', response);
        alert('User updated successfully!');
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
      this.items = this.items.filter(item => item.id !== itemId);
      console.log('Item deleted:', itemId);
    }
  }
}