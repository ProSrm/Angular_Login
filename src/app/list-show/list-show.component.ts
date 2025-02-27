import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-show',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list-show.component.html',
  styleUrls: ['./list-show.component.css']
})
export class ListShowComponent {
  items = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Alice Johnson', email: 'alice@example.com', role: 'Editor' },
    { id: 4, name: 'Bob Brown', email: 'bob@example.com', role: 'User' },
  ];

  editingItemId: number | null = null;

  // Start editing an item
  startEditing(itemId: number): void {
    this.editingItemId = itemId;
  }

  // Save changes for the edited item
  saveChanges(item: any): void {
    this.editingItemId = null; // Exit editing mode
    console.log('Updated item:', item); // You can send the updated item to your backend here
  }

  // Delete an item with confirmation
  deleteItem(itemId: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this item?');
    if (confirmDelete) {
      this.items = this.items.filter(item => item.id !== itemId); // Remove the item from the list
      console.log('Item deleted:', itemId); // You can send a delete request to your backend here
    }
  }
}