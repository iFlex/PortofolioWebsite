import { Component } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';

import { TravelsModule } from './travels.module';

export function main() {
  describe('Travels component', () => {
    // Setting module for testing
    // Disable old forms

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestComponent],
        imports: [TravelsModule]
      });
    });

    it(
      'should work',
      async(() => {
        TestBed.compileComponents().then(() => {
          const fixture = TestBed.createComponent(TestComponent);
          const TravelsDOMEl = fixture.debugElement.children[0].nativeElement;

          expect(TravelsDOMEl.querySelectorAll('h2')[0].textContent).toEqual(
            'Features'
          );
        });
      })
    );
  });
}

@Component({
  selector: 'test-cmp',
  template: '<sd-travels></sd-travels>'
})
class TestComponent {}
