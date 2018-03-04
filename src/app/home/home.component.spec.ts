import { FormsModule } from '@angular/forms';
import {
  async,
  TestBed
 } from '@angular/core/testing';

import { Observable } from 'rxjs/Observable';

import { HomeComponent } from './home.component';

export function main() {
  describe('Home component', () => {

    beforeEach(() => {

      TestBed.configureTestingModule({
        imports: [FormsModule],
        declarations: [HomeComponent],
        
      });

    });

    it('should work',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            const fixture = TestBed.createComponent(HomeComponent);
            const homeInstance = fixture.debugElement.componentInstance;
            const homeDOMEl = fixture.debugElement.nativeElement;
            
            fixture.detectChanges();

            expect(homeDOMEl.querySelectorAll('li').length).toEqual(3);
            
            homeInstance.newName = 'Minko';
            homeInstance.addName();

            fixture.detectChanges();

            expect(homeDOMEl.querySelectorAll('li').length).toEqual(4);
            expect(homeDOMEl.querySelectorAll('li')[3].textContent).toEqual('Minko');
          });

      }));
  });
}