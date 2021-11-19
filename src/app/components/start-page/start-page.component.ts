import {Component, OnInit} from '@angular/core';
import {CarOwnerService} from "../../services/car-owner.service";
import {OwnerEntity} from "../../models/ownerEntity";


@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent implements OnInit {
  private url = 'api/owners/';
  disabled: boolean = true;
  activeRow!: number | null;
  formData: OwnerEntity | undefined;
  status = '';
  showModal = false

  owners!: OwnerEntity[]


  constructor(private productService: CarOwnerService) {
  }

  ngOnInit(): void {
    this.getData()
  }

  private getData() {
    this.productService.get(this.url).subscribe((products: any) => {
      this.owners = products
      console.log(this.owners)
    });
  }

  create(data: any) {
    this.productService.create(this.url, data).subscribe(response => {
      console.log(response)
      this.getData();
      this.formData = undefined
    });
  }

  update(data: any) {
    if(this.activeRow){
      data.id = this.owners[this.activeRow].id
    }
    this.productService.edit(this.url, data).subscribe(response => console.log(response));
    this.getData()
    this.formData = undefined
  }

  resetValues() {
    return {
      name: "",
      id: null,
      surname: "",
      patronymic: "",
      cars: [
        {
          id: null,
          stateNumbers: '',
          manufacturer: '',
          model: '',
          year: null
        }
      ]
    }

  }


  removeProduct(car: any) {
    const id = car.id;
    this.productService.delete(this.url, id).subscribe(product => console.log(product));
    this.getData()
  }


  btnClick($event: any): void {
    console.log($event.target.tagName == 'BUTTON')
    if (this.activeRow != null && $event.target.tagName == 'BUTTON') {
      this.formData = this.owners[this.activeRow]
    }
      switch ($event.target.id) {
        case 'add':
          this.status = 'add'
          this.showModal = true
          this.formData = this.resetValues()
          break

        case 'edit':
          this.status = 'edit'
          this.showModal = true
          break

        case 'view':
          this.status = 'view'
          this.showModal = true
          break

        case 'delete':
          if (this.activeRow != null) {
            this.formData = undefined
            this.removeProduct(this.owners[this.activeRow])
          }
          break

        default:
          break
      }
  }

  tableClick($event: any): void {
    let index: number = $event.target.parentElement.id;

    if (this.activeRow !== index) {
      this.activeRow = index
      this.disabled = false
    } else {
      this.activeRow = null
      this.disabled = true
    }
  }

  submitEmit(data: any) {
    if (this.status == 'add') {
      this.create(data)
    }
    if (this.status == 'edit') {
      this.update(data)
    }
  }

  closeModal(event: any) {
    if(event.target.className.includes('formWrap')){
      this.showModal = false
    }else{
      return
    }
  }
}
