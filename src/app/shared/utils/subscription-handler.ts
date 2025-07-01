import { Subscription } from 'rxjs';

export class SubscriptionHandler {
  private _subscriptions: Subscription[] = [];

  set add(subscription: Subscription) {
    this._subscriptions.push(subscription);
  }

  unSubscribe() {
    if (this._subscriptions.length) {
      this._subscriptions.forEach((subscription) => {
        subscription.unsubscribe();
      });
    }
  }
}
