import {Component, OnDestroy, OnInit} from '@angular/core';
import {CarOwnerService} from "../../services/car-owner.service";
import {OwnerEntity} from "../../models/ownerEntity";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent implements OnInit, OnDestroy {
  getSub$!: Subscription;
  createSub$!: Subscription;
  editSub$!: Subscription;
  deleteSub$!: Subscription;


  private url = 'api/owners/';
  disabled: boolean = true;
  activeRow!: number | null;
  formData: OwnerEntity | undefined;
  status: string = '';
  showModal: boolean = false

  owners!: OwnerEntity[]


  constructor(private carOwnerService: CarOwnerService) {
  }

  ngOnInit(): void {
    this.getData()
  }

  private getData(): void {
    this.getSub$ = this.carOwnerService.get(this.url).subscribe((products: any) => {
      this.owners = products
    });
  }

  create(data: any): void {
    this.createSub$ = this.carOwnerService.create(this.url, data).subscribe(response => {
      this.getData();
      this.formData = undefined
      console.log(response)
    });
  }

  update(data: OwnerEntity): void {
    if (this.activeRow) {
      data.id = this.owners[this.activeRow].id
    }
    this.editSub$ = this.carOwnerService.edit(this.url, data).subscribe(response => console.log(response));
    this.getData()
    this.formData = undefined
  }

  resetValues(): OwnerEntity {
    return {
      firstName: "",
      id: null,
      lastName: "",
      secondName: "",
      cars: [
        {
          id: null,
          stateNumbers: '',
          manufacturer: '',
          model: '',
          year: null,
          ownerId: null
        }
      ]
    }

  }

  removeProduct(car: OwnerEntity) {
    if (car && car.id || car.id == 0) {
      const id = car.id;
      this.deleteSub$ = this.carOwnerService.delete(this.url, id).subscribe(product => console.log(product));
      this.getData()
    }
  }


  btnClick($event: any): void {
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

  submitEmit(data: OwnerEntity): void {
    if (this.status == 'add') {
      this.create(data)
    }
    if (this.status == 'edit') {
      if (!data.cars.length) {
        this.removeProduct(data)
        this.getData()
        this.formData = undefined
      } else {
        this.update(data)
      }
    }
  }

  closeModal(event: any): void {
    if (event.target.className.includes('formWrap')) {
      this.showModal = false
    } else {
      return
    }
  }

  ngOnDestroy(): void {
    if (this.getSub$) {
      this.getSub$.unsubscribe()
    }

    if (this.createSub$) {
      this.createSub$.unsubscribe()
    }

    if (this.editSub$) {
      this.editSub$.unsubscribe()
    }

    if (this.deleteSub$) {
      this.deleteSub$.unsubscribe()
    }
  }
}
