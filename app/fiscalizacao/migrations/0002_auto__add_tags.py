# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'Tags'
        db.create_table(u'fiscalizacao_tags', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(max_length=20)),
            ('size', self.gf('django.db.models.fields.IntegerField')(default=1)),
        ))
        db.send_create_signal(u'fiscalizacao', ['Tags'])


    def backwards(self, orm):
        # Deleting model 'Tags'
        db.delete_table(u'fiscalizacao_tags')


    models = {
        u'fiscalizacao.relato': {
            'Meta': {'object_name': 'Relato'},
            'anonymous': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'description': ('django.db.models.fields.CharField', [], {'max_length': '200'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'incidentTitle': ('django.db.models.fields.CharField', [], {'max_length': '200'}),
            'latitude': ('django.db.models.fields.CharField', [], {'max_length': '20'}),
            'longitude': ('django.db.models.fields.CharField', [], {'max_length': '20'}),
            'timestamp': ('django.db.models.fields.DateField', [], {}),
            'user': ('django.db.models.fields.CharField', [], {'max_length': '50'})
        },
        u'fiscalizacao.tags': {
            'Meta': {'object_name': 'Tags'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '20'}),
            'size': ('django.db.models.fields.IntegerField', [], {'default': '1'})
        }
    }

    complete_apps = ['fiscalizacao']