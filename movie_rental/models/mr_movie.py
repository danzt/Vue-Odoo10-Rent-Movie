# -*- coding: utf-8 -*-
from odoo import models, fields

class MrMovie(models.Model):
    _name = 'mr.movie'
     
    name = fields.Char(string=u'Name')
    descripcion = fields.Char('Descripcion')
    category_ids = fields.Many2many('mr.category')
    type_ids = fields.Many2many('mr.type')
    year = fields.Char('Year')
    image = fields.Binary('Image Movie', attachment=True)
    price = fields.Float('Price')