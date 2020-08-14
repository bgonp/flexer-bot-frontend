export class Rule {
  constructor({ id = 0, type = this.AND, rules = [], words = [] }) {
    this.id = id
    this.type = type
    this.rules = rules
    this.words = words
  }

  match(message) {
    let found
    for (const word of this.words) {
      found = new RegExp(
        '(?:^|[,:;?!.\\-\\* ])' +
          word.value
            .replace(/\?/g, '\\?')
            .replace(/\./g, '\\.')
            .replace(/\*/g, '[^\\s]*') +
          '(?:$|[,:;?!.\\-\\* ])'
      ).test(message)
      if (this.type === this.OR && found) {
        return true
      } else if (this.type === this.AND && !found) {
        return false
      }
    }

    for (const rule of this.rules) {
      if (this.type === this.OR && rule.matches(message)) {
        return true
      } else if (this.type === this.AND && !rule.matches(message)) {
        return false
      }
    }

    return this.type === this.AND
  }

  static get(object) {
    return new Rule(
      object.id,
      object.type,
      object.rules.map((rule) => Rule.get(rule)),
      object.words
    )
  }

  static AND = 'and'
  static OR = 'or'
}
