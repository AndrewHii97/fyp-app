import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav'; 
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge'; 
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
    imports:[
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatButtonModule,
        MatBadgeModule,
        MatCardModule,
        MatMenuModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatGridListModule,
        MatSnackBarModule,
        MatDialogModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule
    ],
    exports:[ 
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatButtonModule,
        MatBadgeModule,
        MatCardModule,
        MatMenuModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatGridListModule,
        MatSnackBarModule,
        MatDialogModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule
        
    ]
    
}) 

export class MaterialModule {} 