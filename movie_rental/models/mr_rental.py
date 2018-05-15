# -*- coding: utf-8 -*-
from odoo import models, fields, api


class MrRental(models.Model):
    _name = 'mr.rental'

    def _computed_amount(self, movie_ids):
        total = 0
        for domain in movie_ids:
            for movie in self.env['mr.movie'].search([('id', 'in', domain[2])]):
                total += movie.price
        return total

    user_id = fields.Many2one('res.users', string="User")
    movie_ids = fields.Many2many('mr.movie', string="Movies")
    total_amount_rent = fields.Float('Total Amount')

    @api.model
    def create(self, vals):
        vals['total_amount_rent'] = self._computed_amount(vals.get('movie_ids'))
        return super(MrRental, self).create(vals)

    @api.multi
    def write(self, vals):
        vals['total_amount_rent'] = self._computed_amount(vals.get('movie_ids'))

        return super(MrRental, self).write(vals)