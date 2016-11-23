import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Rx";
import 'marked';
import * as marked from 'marked';
import {DrupalService} from "./app.drupal.service";

@Injectable()
export class ProductService {

  private taxonomyTerms;

  constructor(private drupalService:DrupalService)
  {
    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: true,
      smartLists: true,
      smartypants: false
    });

    this.loadTaxonomies();
  }

  isEducation(product)
  {
    return product.type == "education";
  }

  isService(product)
  {
    return product.type == "service";
  }

  loadTaxonomies()
  {
    this.drupalService.getAllTaxonomies().subscribe(
      data => {
        this.taxonomyTerms = data;
      }
    );
  }

  getFormattedArrayField(arrayField)
  {
    let formatted = "";
    for(let i = 0; i < arrayField.length; i++)
    {
      formatted += arrayField[0];

      if((i + 1) < arrayField.length)
        formatted += ", "
    }
    return formatted;
  }

  getTermNames(terms)
  {
    let termNames = "";
    if(this.taxonomyTerms) {
      for(let i = 0; i < terms.length; i++)
      {
        termNames += this.getTermName(terms[i]);

        if((i + 1) < terms.length)
          termNames += ", "
      }
    }
    return termNames;
  }

  getTermName(term)
  {
    if(this.taxonomyTerms) {
      return this.taxonomyTerms[term.id].name;
    }

    return "";
  }

  getBodyHtml(product)
  {
    return marked(product.body.value);
  }

  getLogoUrl(product)
  {
    if(product.field_logo && product.field_logo.alt)
      return "https://researchit.cer.auckland.ac.nz:8080/sites/default/files/" + product.field_logo.alt;
    return "assets/service.png";
  }
}
