import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as specData from '../configs/specData.json';
import * as spredSheetData from '../configs/spreadSheetData.json';
import * as configuratorOptions from '../configs/configurator.json';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-drawing-spec-document',
  templateUrl: './drawing-spec-document.component.html',
  styleUrls: ['./drawing-spec-document.component.scss']
})
export class DrawingSpecDocumentComponent implements OnInit {
  @ViewChild('wordContent', { static: false }) wordContent!: ElementRef;

  constructor(private modalService: NgbModal) { }
specData: any = (specData as any).default;
spredSheetData: any = (spredSheetData as any).default;
// configuratorOptions: any = (configuratorOptions as any).default;
@Input() configuratorOptions: any;
@Input() isDownload: any;
@Input() configSelectedValues: any;

  ngOnInit(): void {
    console.log(this.specData);
    console.log(this.spredSheetData);
    console.log(this.configuratorOptions);
    console.log(this.configSelectedValues);
    
    this.getSpecData();
  }
  ngAfterViewInit(): void {
    if (this.isDownload) {
      this.generateDoc();
    }
  }
  close(){
    this.modalService.dismissAll();
  }
getSpecData() {
  this.configuratorOptions.Options.forEach((option: any) => {
    let keyword: any;
      if (option.segment == "CUR.DES") {
        let segment2 = this.configuratorOptions.Options.find((el: any) => el.segment == "SL.MTL")
        keyword = this.spredSheetData.spredSheetData.find((item: any) => item.SpecSegment1 == option.segment && item.SpecValue1 == option.value && (!segment2?.segment || (item.SpecSegment2 == segment2.segment && item.SpecValue2 == segment2.value)))?.Keyword;
      } else if (option.segment == "CUR.FIN" || option.segment == "PC.CUR.REQ") {
        let segment2 = this.configuratorOptions.Options.find((el: any) => el.segment == "PC.CUR.CC.Y")
        keyword = this.spredSheetData.spredSheetData.find((item: any) => item.SpecSegment1 == option.segment && item.SpecValue1 == option.value && (!segment2?.segment || (item.SpecSegment2 == segment2.segment && item.SpecValue2 == segment2.value)))?.Keyword;
      }
      else {
       keyword = this.spredSheetData.spredSheetData.find((item: any) => item.SpecSegment1 == option.segment && item.SpecValue1 == option.value)?.Keyword;
      }
    Object.keys(this.specData).forEach(key => (
      Object.keys(this.specData[key].validOptionData).forEach(specKey => {
        if (specKey == keyword) {
          this.specData[key].validOption = keyword;
        } 
      })
    ));
  });

console.log(this.specData);

}
generateDoc() {
  const css = 
  `
  <style>
  body {
    font-family: 'Calibri', serif;
  }
  .main-container {
    padding: 100px;
}
.header {
    margin-bottom: 12px;
}
.heading {
    text-align: center;
    font-size: 22px;
    font-weight: bold;
}
.header-part {
    border: 1px solid black;
    padding: 12px;
}

.highlight-yellow {
    background-color: yellow;
  }
.red-note {
    color: red;
    font-weight: bold;
    font-size: 18px;
  }
  .section-title {
    font-weight: bold;
  }
  .bold {
    font-weight: bold;
  }
  .small-text {
    font-size: 0.9em;
  }
  .indented {
    margin-left: 20px;
  }
  .sub-indented {
    margin-left: 40px;
  }
  .sub-sub-indented {
    margin-left: 60px;
  }
  .sub-sub-sub-indented {
    margin-left: 80px;
  }
  .sub-sub-sub-sub-indented {
    margin-left: 100px;
  }
  strong {
    margin-right: 8px;
  }
  </style>
  `
  const html = this.wordContent.nativeElement.innerHTML;

    const fullHTML = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' 
            xmlns:w='urn:schemas-microsoft-com:office:word' 
            xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
          <meta charset='utf-8'>
          <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap" rel="stylesheet">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
          <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js" integrity="sha384-7+zCNj/IqJ95wo16oMtfsKbZ9ccEh31eOz1HGyDuCQ6wgnyJNSYdrPa03rtR1zdB" crossorigin="anonymous"></script>
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js" integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13" crossorigin="anonymous"></script>

          ${css}
        </head>
        <body>
          ${html}
        </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', fullHTML], {
      type: 'application/msword'
    });
    this.modalService.dismissAll();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'rolling-service-door.doc';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

}


