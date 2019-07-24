import CancelHandler from './cancel-handler.interface'

export default interface Cancel {
  (handler: CancelHandler): void
}
