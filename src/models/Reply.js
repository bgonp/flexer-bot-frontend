import { Rule } from './Rule'

export class Reply {
  constructor({ id = 0, rule, replies = [] }) {
    this.id = id
    this.rule = rule
    this.replies = replies
  }

  static get(object) {
    return new Reply({
      id: object.id,
      rule: Rule.get(object.rule),
      replies: object.replies,
    })
  }

  match(message) {
    return this.rule.match(message)
  }

  getReply() {
    return this.replies[Math.floor(Math.random() * this.replies.length)]
  }
}
