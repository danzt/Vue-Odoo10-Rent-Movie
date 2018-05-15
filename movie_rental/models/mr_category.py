# -*- coding: utf-8 -*-
from odoo import models, fields

class MrCategory(models.Model):
    _name = 'mr.category'

    name = fields.Char('Name')