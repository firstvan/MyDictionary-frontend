import {Component, OnInit, Input, Output, EventEmitter,} from '@angular/core';
import { suggestedWordsMock, wordsMock } from '../mock/words.mock';
import {Word} from "../models/word.model";

@Component({
  selector: 'wordstable',
  templateUrl: 'words-table.component.html',
  styleUrls: ['words-table.component.css']
})
export class WordsTableComponent implements OnInit {
  @Input() selectionColumn: boolean = false;
  @Input() range: boolean =false;
  @Input() name: boolean = false;
  @Input() meaning: boolean = false;
  @Input() wordClass: boolean = false;
  @Input() deleteColumn: boolean = false;
  @Input() approve: boolean = false;
  @Input() words: Array<Word>;
  @Output() approved = new EventEmitter<any>();
  @Output() Deleted = new EventEmitter<any>();
  modified: Word[];
  Allmodified: Word[];
  selected: Word[];
  own: Word[];

  ngOnInit() {
    this.modified = [] ;
    this.selected = [] ;
    this.Allmodified = [];
    this.own = this.words.slice();
    console.log(this.words.toString()+ "ABBA");
  }

  onModify(word)
  {
    if(this.Allmodified.indexOf(word) === -1)
      this.Allmodified.push(word);
    let v =this.modified.indexOf(word);
    if(v == -1)
      this.modified.push(word);
    else
      this.modified = this.modified.filter(i => i !== word);
  }

  onDelete(word){

    this.words = this.words.filter(item => item !== word);
    let array =[word];
    console.log(word);
    this.Deleted.emit({array});
  }

  onSelected(word){

    //console.log(index);
    let v =this.selected.indexOf(word);
    //console.log(v);
    if(v == -1)
      this.selected.push(word);
    else
      this.selected = this.selected.filter(i => i !== word);
  }

  onSelectedList(event){
    console.log(event);
    if(event.srcElement.checked === true )
      this.words.forEach(elem => this.selected.push(elem));
    else
      this.selected= [];
  }

  onDeleteAll()
  {
    let array =[];
    this.words.forEach(word => {
      if(this.selected.indexOf(word) > -1)
          array.push(word);
    });
    this.words = this.words.filter(word => this.selected.indexOf(word) ==-1);
    this.Deleted.emit({array});
  }

  onModifyAll()
  {
    this.selected.forEach(word =>{
      if(this.modified.indexOf(word) === -1) {
        this.modified.push(word);
        this.Allmodified.push(word);
      }});
    //this.modified.splice(this.modified.indexOf(word),1));
    //this.selected.forEach(index => console.log(index));

    console.log(this.words + " ABBA");
    //console.log(this.modifided);
    //console.log(this.selected);
  }

  onApprove(){

    this.own.forEach(we => console.log(we));
    //this.words.forEach(we => console.log(we));
    /*
    let array: Word[];
    this.words.forEach(word => {
      if(this.selected.indexOf(word) > -1 && wordsMock.indexOf(word) === -1)
      {
        //console.log((word.id-1)/2);
        //wordsMock.push(word);
        array.push(word);
        this.words = this.words.filter(item => item !== word);
        //console.log("ABBA");
      }
      //console.log(this.selected.indexOf(word) > -1);
      //console.log(wordsMock.indexOf(word) == -1);
    });
    this.selected.forEach(word => suggestedWordsMock.splice(suggestedWordsMock.indexOf(word),1));
    this.selected = [];
    this.approved.emit(array);
    */
  }

}
