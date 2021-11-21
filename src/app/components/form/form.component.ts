import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import {CarOwnerService} from "../../services/car-owner.service";
import {OwnerEntity} from "../../models/ownerEntity";
import {CarEntity} from "../../models/carEntity";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnDestroy {
  getSub$!: Subscription
  @Input() formData: OwnerEntity | undefined;
  @Input() status!: string;
  @Output() submitEmit: EventEmitter<any> = new EventEmitter<OwnerEntity>()
  @Output() backEmit: EventEmitter<any> = new EventEmitter<boolean>()

  carsForm!: FormGroup;
  carsQuantity: number = 1;
  isSubmit: boolean = false;
  errorIndex: number[] = []

  constructor(
    private formBuilder: FormBuilder,
    private carOwnerService: CarOwnerService) {
  }

  ngOnInit(): void {
    this.formInit()
  }

  formInit(): void {

    this.carsForm = this.formBuilder.group({
      firstName: [this.formData?.firstName, Validators.compose([
        Validators.required,
        Validators.maxLength(32),

      ])],
      lastName: [this.formData?.lastName, Validators.compose([
        Validators.required,
        Validators.maxLength(32)])],
      secondName: [this.formData?.secondName, Validators.compose([
        Validators.required,
        Validators.maxLength(32)])],
      cars: new FormArray([]),
    })

    if (this.formData) {

      for (let i = 0; i < this.formData.cars.length; i++) {

        if (this.formData?.cars.length != 0) {
          this.carsControl.push(this.formBuilder.group({
            stateNumbers: [this.formData?.cars[i].stateNumbers, Validators.compose([
              Validators.required,
              Validators.maxLength(8),
              Validators.pattern("^[A-Z]{2}(?!0{4})\\d{4}[A-Z]{2}$")])],
            manufacturer: [this.formData?.cars[i].manufacturer, Validators.compose([
              Validators.required,
              Validators.maxLength(16)])],
            model: [this.formData?.cars[i].model, Validators.compose([
              Validators.required,
              Validators.maxLength(16)])],
            year: [this.formData?.cars[i].year, Validators.compose([
              Validators.required, Validators.maxLength(4),
              Validators.min(1990), Validators.max(new Date().getFullYear())])],
          }))
        }

      }
    }
  }

  get ownerControl() {
    return this.carsForm.controls;
  }

  get carsControl() {
    return this.ownerControl.cars as FormArray;
  }

  oneMoreCars(): void {
    this.carsControl.push(this.formBuilder.group({
      stateNumbers: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(8),
        Validators.pattern("^[A-Z]{2}(?!0{4})\\d{4}[A-Z]{2}$")])],
      manufacturer: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(16)])],
      model: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(16)])],
      year: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(4),
        Validators.min(1990),
        Validators.max(new Date().getFullYear())])],
    }));
    this.carsQuantity = this.carsQuantity + 1;
  }

  deleteCar(index: number): void {
    this.carsControl.removeAt(index);
    this.carsQuantity = this.carsQuantity - 1;
  }


  addAdditionalMarker(data: OwnerEntity[]) {
    data.map((x: OwnerEntity) => {
      for (let i = 0; i < x.cars.length; i++) {
        const car = x.cars[i];
        car.ownerId = x.id
      }
    })
  }

  checkUniqueCurrent(): boolean {
    let arr = this.carsForm.value?.cars.map((car: CarEntity) => {
      return car.stateNumbers
    })

    return arr?.length === new Set(arr).size
  }

  letsFindEqualCarNumbers(data: any): Array<any> {
    let stateNumExist: any = []

    let stateArr = data.map((owner: OwnerEntity) => {
      return owner.cars.map((car: CarEntity) => {
        return car
      })
    }).flat()

    for (let i = 0; i < this.carsForm.value.cars.length; i++) {
      this.carsForm.value.cars[i].index = i
      const datum = this.carsForm.value.cars[i];

      if (stateArr.findIndex((x: any) => {
        datum.ownerId = x.ownerId
        return datum.stateNumbers == x.stateNumbers
      }) != -1) {
        stateNumExist.push(datum)
      }

      stateNumExist = stateNumExist.filter((car: any) => {
        return car.ownerId != this.formData?.id
      })

      this.errorIndex = stateNumExist.map((el: any) => {
        return el.index
      })
    }
    return stateNumExist
  }

  save(): void {
    this.isSubmit = true

    if (this.checkUniqueCurrent()) {

      this.getSub$ = this.carOwnerService.get('api/owners/').subscribe((data: any) => {

        this.addAdditionalMarker(data)

        if (this.carsForm.status == 'VALID' && !this.letsFindEqualCarNumbers(data).length) {

          this.carsForm.value.id = this.formData?.id
          this.submitEmit.emit(this.carsForm.value)
        }
      })
    }
  }

  back(): void {
    this.backEmit.next(true)
  }

  compareIndex(i: number) {
    return this.errorIndex.includes(i);
  }

  ngOnDestroy() {
    if (this.getSub$) {
      this.getSub$.unsubscribe()
    }
  }

}
