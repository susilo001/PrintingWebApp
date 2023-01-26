<?php

namespace App\Filament\Resources;

use App\Filament\Resources\OrderResource\Pages;
use App\Filament\Resources\OrderResource\RelationManagers;
use App\Models\Order;
use Filament\Forms;
use Filament\Forms\Components\Card;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\Select;
use Filament\Resources\Form;
use Filament\Resources\Resource;
use Filament\Resources\Table;
use Filament\Tables;

class OrderResource extends Resource
{
    protected static ?string $model = Order::class;

    protected static ?string $navigationIcon = 'heroicon-o-shopping-bag';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('user_id')
                    ->disabled()
                    ->required(),
                Select::make('status')
                    ->required()
                    ->options([
                        'pending' => 'Pending',
                        'processing' => 'Processing',
                        'completed' => 'Completed',
                        'cancelled' => 'Cancelled',
                    ]),
                Card::make()->columns(1)->schema([
                    Grid::make()->schema([
                        Forms\Components\TextInput::make('subtotal')
                            ->numeric()
                            ->required(),
                        Forms\Components\TextInput::make('discount')
                            ->numeric()
                            ->required(),
                        Forms\Components\TextInput::make('tax')
                            ->numeric()
                            ->required(),
                        Forms\Components\TextInput::make('total_amount')
                            ->numeric()
                            ->required(),
                    ]),
                ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('id')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\BadgeColumn::make('status')
                    ->colors([
                        'primary',
                        'secondary' => static fn ($state): bool => $state === 'pending',
                        'warning' => static fn ($state): bool => $state === 'processing',
                        'success' => static fn ($state): bool => $state === 'completed',
                        'danger' => static fn ($state): bool => $state === 'cancelled',
                    ])
                    ->sortable(),
                Tables\Columns\TextColumn::make('user.name')
                    ->searchable(),
                Tables\Columns\TextColumn::make('subtotal')
                    ->money('IDR', true),
                Tables\Columns\TextColumn::make('discount')
                    ->money('IDR', true),
                Tables\Columns\TextColumn::make('tax')
                    ->money('IDR', true),
                Tables\Columns\TextColumn::make('total_amount')
                    ->money('IDR', true),
                Tables\Columns\TextColumn::make('created_at')
                    ->sortable()
                    ->dateTime('d/m/Y'),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            'order_items' => RelationManagers\OrderItemsRelationManager::class,
            'paymentDetail' => RelationManagers\PaymentDetailRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListOrders::route('/'),
            'create' => Pages\CreateOrder::route('/create'),
            'edit' => Pages\EditOrder::route('/{record}/edit'),
        ];
    }
}
