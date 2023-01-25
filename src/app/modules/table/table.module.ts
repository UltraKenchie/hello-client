import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TableComponent } from "./components/table/table.component";
import { TableRowComponent } from "./components/table-row/table-row.component";
import { TableColumnComponent } from "./components/table-column/table-column.component";
import { SharedModule } from "../../shared/shared.module";
import { TablePaginationComponent } from './components/table-pagination/table-pagination.component';

@NgModule({
    declarations: [TableComponent, TableRowComponent, TableColumnComponent, TablePaginationComponent],
    imports: [CommonModule, SharedModule],
    exports: [TableComponent, TableRowComponent, TableColumnComponent]
})
export class TableModule {}
