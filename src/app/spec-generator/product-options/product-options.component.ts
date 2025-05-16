import { Component, OnInit } from '@angular/core';
import * as productOptions from '../configs/productOptions.json';
import * as configuratorOptions from '../configs/configurator.json';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-options',
  templateUrl: './product-options.component.html',
  styleUrls: ['./product-options.component.scss']
})
export class ProductOptionsComponent implements OnInit {
  isDownload: any;

  constructor(private modalService: NgbModal) { }
  productOptions: any = (productOptions as any).default;
  configuratorOptions: any = (configuratorOptions as any).default;
isPowderCoatSelected: boolean = false;
isMotorSelected: boolean = false;
configSelectedValues: any = {
  manufacturer: null,
  productType: null,
  operation: null,
  motor: null,
  curtainDesign: null,
  material: null,
  finishType: null,
  powderCoatColor: null,
  bottomBar: null,
  locking: null
}
  ngOnInit(): void {
    console.log(this.productOptions);
    console.log(this.configuratorOptions);
    
  }
updateConfiguratorOptions(item: any) {
// console.log(item);
if (item?.manufacturerID) {
  this.configuratorOptions.Options.forEach((option:any) => {
    if (option.segment == "PRIVATE.LBL.OE") {
      option.value = item.Code;
    }
  })
} else if (item?.CurtainDesignID) {
  this.configuratorOptions.Options.forEach((option:any) => {
    if (option.segment == "CUR.DES") {
      option.value = item.Code;
    }
  })
} else if (item?.MaterialID) {
  this.configuratorOptions.Options.forEach((option:any) => {
    if (option.segment == "SL.MTL") {
      option.value = item.Code;
    }
  })
} else if (item?.FinishTypeID) {
  this.isPowderCoatSelected = item.Code == 'C';
  this.configuratorOptions.Options.forEach((option:any) => {
    if (item.Name.includes("GALVANIZED")) {
      if (option.segment == "CUR.FIN") {
        option.value = item.Code;
      }
      if (option.segment == "PC.CUR.CC.Y") {
        option.value = item.Name?.includes("ULTRA") ? "Y" : "N";
      }
    }
    // else if (item.Name.includes("ALUMINIUM")) {
      else {
      if (option.segment == "SL.FIN" || option.segment == "BBA.FIN" || option.segment == "GID.FIN") {
        option.value = item.Code;
      }
      
    } 
    // else {
    //   if (option.segment == "SL.FIN") {
    //     option.value = item.Code;
    //   }
    // }

    
  })
} else if (item?.BottomBarID) {
  this.configuratorOptions.Options.forEach((option:any) => {
    if (option.segment == "BBA.TYP") {
      option.value = item.Code;
    }
  })
} else if (item?.PCColorID) {
  this.configuratorOptions.Options.forEach((option:any) => {
    if (item.Name.includes("SPECTRA")) {
      if (option.segment == "PC.CUR.REQ") {
        option.value = item.Code;
      }
      if (option.segment == "PC.CUR.CC.Y") {
        option.value = item.Name?.includes("ULTRA") ? "Y" : "N";
      }
    }else {
      if (option.segment == "PC.CUR" || option.segment == "PC.BBA" || option.segment == "PC.GID" || option.segment == "PC.BRX") {
        option.value = item.Code;
      }
    }
  })
} else if (item?.OperationID) {
  this.isMotorSelected = item.Code == 'M';
  this.configuratorOptions.Options.forEach((option:any) => {
    if (option.segment == "UNT.OPR") {
      option.value = item.Code;
    }
  })
} else if (item?.MotorOptionID) {
  this.configuratorOptions.Options.forEach((option:any) => {
    if (option.segment == "MTR.TYP") {
      option.value = item.Code;
    }
  })
} else if (item?.LockOptionID) {
  this.configuratorOptions.Options.forEach((option:any) => {
    if (option.segment == "LCK.OPR") {
      option.value = item.Code;
    }
  })
} 
console.log(this.configuratorOptions);

}
openDrawingDoc(content: any, type: boolean) {
  console.log(this.configSelectedValues);
  
  this.isDownload = type;
  this.modalService.open(content, {
    centered: true,
    scrollable: true,
    size: 'lg',
    windowClass: 'orderModal',
    // backdrop: 'static',
  });

}

validateProductDetails() {
  return this.configSelectedValues.manufacturer 
        && this.configSelectedValues.productType
        && this.configSelectedValues.operation
        && (!this.isMotorSelected || this.configSelectedValues.motor)
        && this.configSelectedValues.curtainDesign
        && this.configSelectedValues.material
        && this.configSelectedValues.finishType
        && (!this.isPowderCoatSelected || this.configSelectedValues.powderCoatColor)
        && this.configSelectedValues.bottomBar
        && this.configSelectedValues.locking
}
resetData() {
  this.configSelectedValues = {
    manufacturer: null,
    productType: null,
    operation: null,
    motor: null,
    curtainDesign: null,
    material: null,
    finishType: null,
    powderCoatColor: null,
    bottomBar: null,
    locking: null
  }
}
}

