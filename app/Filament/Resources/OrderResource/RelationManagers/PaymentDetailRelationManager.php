<?php

namespace App\Filament\Resources\OrderResource\RelationManagers;

use Filament\Forms\Components\TextInput;
use Filament\Resources\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Resources\Table;
use Filament\Tables;
use Filament\Tables\Columns\BadgeColumn;
use Filament\Tables\Columns\TextColumn;

class PaymentDetailRelationManager extends RelationManager
{
    protected static string $relationship = 'paymentDetail';

    protected static ?string $recordTitleAttribute = 'gross_amount';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('gross_amount')
                    ->numeric()
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                BadgeColumn::make('status')
                    ->colors([
                        'warning' => 'pending',
                        'success' => 'capture',
                        'success' => 'settlement',
                        'danger' => 'cancel',
                        'danger' => 'expired',
                    ])
                    ->sortable(),
                TextColumn::make('transaction_id'),
                TextColumn::make('gross_amount')
                    ->money('IDR', true),
                TextColumn::make('payment_type'),
                TextColumn::make('transaction_time')
                    ->datetime(),
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
