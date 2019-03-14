import {
  Component,
  Input,
  Injectable,
  Output,
  EventEmitter,
  HostListener
} from '@angular/core';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})

@Injectable()
export class LoginModalComponent {

  constructor() { }

  @Input() login: Function;
  @Input() signup: Function;

  @Input() modalState: string | null;
  @Input() setModal: (status: string | null) => void;
  toggleModal = () => {
    if (this.modalState === 'login') {
      this.setModal('signup');
    } else {
      this.setModal('login');
    }
  }
  closeModal = () => {
    this.setModal(null);
  }
  @HostListener('click', ['$event']) onClick(e) {
    if (e.target.tagName === 'APP-LOGIN-MODAL') {
      this.closeModal();
    }
  };

  handleSubmit(e) {
    e.preventDefault();
    const body = Array.from(e.target).reduce((acc, { name: key, value }) => {
      if (key) {
        acc[key] = value;
      }
      return acc;
    }, {});

    if (this.modalState) {
      const action = this.modalState;
      this[action](body)
        .then(this.closeModal)
        .catch(err => {
          console.error(err);
        })
    }
  }
}
