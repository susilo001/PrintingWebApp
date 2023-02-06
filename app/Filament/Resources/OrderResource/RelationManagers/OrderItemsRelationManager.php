<?php

namespace App\Filament\Resources\OrderResource\RelationManagers;

use Filament\Forms;
use Filament\Resources\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Resources\Table;
use Filament\Tables;

class OrderItemsRelationManager extends RelationManager
{
    protected static string $relationship = 'orderItems';

    protected static ?string $recordTitleAttribute = 'name';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')
                    ->required()
                    ->maxLength(255),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name'),
                Tables\Columns\TextColumn::make('product.name'),
                Tables\Columns\TextColumn::make('qty'),
                Tables\Columns\TextColumn::make('price')
                    ->money('IDR', true),
                Tables\Columns\TextColumn::make('variants')->getStateUsing(function ($record) {
                    return array_map(
                        fn ($variant) => $variant['name'].': '.$variant['value'],
                        $record->variants
                    );
                }),
                Tables\Columns\TextColumn::make('discount')
                    ->money('IDR', true),
                Tables\Columns\TextColumn::make('tax')
                    ->money('IDR', true),
            ])
            ->filters([
                //
            ])
            ->headerActions([
                Tables\Actions\CreateAction::make(),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
            ]);
    }
}
