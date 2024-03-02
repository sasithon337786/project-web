import { Component } from '@angular/core';
import { Navtop10Component } from "../nav/navtop10/navtop10.component";

@Component({
    selector: 'app-top10',
    standalone: true,
    templateUrl: './top10.component.html',
    styleUrl: './top10.component.scss',
    imports: [ Navtop10Component]
})
export class Top10Component {

}
