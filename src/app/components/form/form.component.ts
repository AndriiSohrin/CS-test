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
export class FormComponent implements OnInit , OnDestroy{
  getSub$!: Subscription
  @Input() formData: OwnerEntity | undefined;
  @Input() status!: string;
  @Output() submitEmit: EventEmitter<any> = new EventEmitter<any>()
  @Output() backEmit: EventEmitter<any> = new EventEmitter<any>()

  carsForm!: FormGroup;
  carsQuantity: number = 1
  isSubmit: boolean = false

  constructor(private formBuilder: FormBuilder, private carOwnerService: CarOwnerService) {
  }

  ngOnInit(): void {
    this.formInit()
  }

  formInit(): void {

    this.carsForm = this.formBuilder.group({
      firstName: [this.formData?.firstName, Validators.compose([Validators.required, Validators.maxLength(60)])],
      lastName: [this.formData?.lastName, Validators.compose([Validators.required, Validators.maxLength(60)])],
      secondName: [this.formData?.secondName, Validators.compose([Validators.required, Validators.maxLength(60)])],
      cars: new FormArray([]),
    })

    if (this.formData) {

      for (let i = 0; i < this.formData.cars.length; i++) {

        if (this.formData?.cars.length != 0) {
          this.carsControl.push(this.formBuilder.group({
            stateNumbers: [this.formData?.cars[i].stateNumbers, Validators.compose([Validators.required])],
            manufacturer: [this.formData?.cars[i].manufacturer, Validators.compose([Validators.required])],
            model: [this.formData?.cars[i].model, Validators.compose([Validators.required])],
            year: [this.formData?.cars[i].year, Validators.compose([Validators.required, Validators.maxLength(4), Validators.max(new Date().getFullYear())])],
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

  oneMoreCars() {
    this.carsControl.push(this.formBuilder.group({
      stateNumbers: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
      manufacturer: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
      model: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
      year: ['', Validators.compose([Validators.required, Validators.maxLength(4), Validators.min(1990)])],
    }));
    this.carsQuantity = this.carsQuantity + 1;
  }

  deleteCar(index: number) {
    this.carsControl.removeAt(index);
    this.carsQuantity = this.carsQuantity - 1;
  }

  checkUnique(): boolean {
    let arr = this.carsForm.value?.cars.map((car: CarEntity) => {
      return car.stateNumbers
    })

    return arr?.length === new Set(arr).size
  }

   save() {
    this.isSubmit = true

    if (this.checkUnique()) {

      this.getSub$ = this.carOwnerService.get('api/owners/').subscribe((data: any) => {
        //!== кастиляка ===
        data.map((x: OwnerEntity) => {
          for (let i = 0; i < x.cars.length; i++) {
            const car = x.cars[i];
            car.ownerId = x.id
          }
        })
        //!== кастиляка end ===

        let stateNumExist: any = []
        let stateArr = data.map((owner: OwnerEntity) => {
          return owner.cars.map((car: CarEntity) => {
            return car
          })
        }).flat()

        for (let i = 0; i < this.carsForm.value.cars.length; i++) {
          const datum = this.carsForm.value.cars[i];

          if (stateArr.findIndex((x: any) => {
            datum.ownerId = x.ownerId
            return datum.stateNumbers == x.stateNumbers
          }) != -1) {
            stateNumExist.push(datum)
          }

          if (this.status == 'edit') {
            stateNumExist = stateNumExist.filter((car: CarEntity) => {
              return car.ownerId != this.formData?.id
            })
          }

        }

        console.log(stateNumExist)
        //todo я тут маю масив з номерами якы уже э в базы
        if (this.carsForm.status == 'VALID' && !stateNumExist.length) {

          this.submitEmit.emit(this.carsForm.value)
        }
      })
    }
  }

  back() {
    this.backEmit.next(true)
  }

  isValid(controls: any, param: string | null) {
    if (param) {
      return this.isSubmit && controls.controls[param].status == 'INVALID'
    }
    return this.isSubmit && controls.status == 'INVALID'
  }

  ngOnDestroy() {
    if(this.getSub$){
      this.getSub$.unsubscribe()
    }
  }

}
