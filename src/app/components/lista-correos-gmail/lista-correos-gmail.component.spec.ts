import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCorreosGmailComponent } from './lista-correos-gmail.component';

describe('ListaCorreosGmailComponent', () => {
  let component: ListaCorreosGmailComponent;
  let fixture: ComponentFixture<ListaCorreosGmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaCorreosGmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaCorreosGmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
