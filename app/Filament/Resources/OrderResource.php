<?php

namespace App\Filament\Resources;

use App\Filament\Resources\OrderResource\Pages;
use App\Filament\Resources\OrderResource\RelationManagers;
use App\Models\Order;
use Filament\Forms\Components\Card;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Form;
use Filament\Resources\Resource;
use Filament\Resources\Table;
use Filament\Tables\Actions\DeleteBulkAction;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Columns\BadgeColumn;
use Filament\Tables\Columns\TextColumn;

class OrderResource extends Resource
{
    protected static ?string $model = Order::class;

    protected static ?string $navigationIcon = 'heroicon-o-shopping-bag';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make('Order Information')->schema([
                    Grid::make()->schema([
                        TextInput::make('user_id')
                            ->disabled()
                            ->required(),
                        Select::make('status')
                            ->preload()
                            ->options([
                                'pending' => 'Pending',
                                'processing' => 'Processing',
                                'completed' => 'Completed',
                                'cancelled' => 'Cancelled',
                            ])
                            ->required(),
                    ]),
                    Card::make()->columns(1)->schema([
                        Grid::make()->schema([
                            TextInput::make('subtotal')
                                ->numeric()
                                ->required(),
                            TextInput::make('discount')
                                ->numeric()
                                ->required(),
                            TextInput::make('tax')
                                ->numeric()
                                ->required(),
                            TextInput::make('total_amount')
                                ->numeric()
                                ->required(),
                        ]),
                    ]),
                ]),
                Section::make('Order Items')->schema([
                    Repeater::make('orderItems')
                        ->relationship()
                        ->schema([
                            Grid::make()->schema([
                                TextInput::make('product_id')
                                    ->disabled()
                                    ->required(),
                                TextInput::make('name')
                                    ->required(),
                            ]),
                            Grid::make()->schema([
                                Textarea::make('description')
                                    ->required(),
                                SpatieMediaLibraryFileUpload::make('designs')
                                    ->multiple()
                                    ->enableDownload(true)
                                    ->collection('designs')
                                    ->responsiveImages(),
                            ]),
                            Grid::make(4)->schema([
                                TextInput::make('qty')
                                    ->label('Quantity')
                                    ->numeric()
                                    ->required(),
                                TextInput::make('discount')
                                    ->numeric()
                                    ->required(),
                                TextInput::make('tax')
                                    ->numeric()
                                    ->required(),
                                TextInput::make('price')
                                    ->numeric()
                                    ->required(),
                            ]),
                        ]),
                ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('id')
                    ->searchable()
                    ->sortable(),
                BadgeColumn::make('status')
                    ->sortable(),
                TextColumn::make('user.name')
                    ->label('Customer')
                    ->searchable(),
                TextColumn::make('subtotal')
                    ->money('IDR', true),
                TextColumn::make('discount')
                    ->money('IDR', true),
                TextColumn::make('tax')
                    ->money('IDR', true),
                TextColumn::make('total_amount')
                    ->money('IDR', true),
                TextColumn::make('created_at')
                    ->label('Order Date')
                    ->dateTime('d/m/Y: H:i:s')
                    ->sortable(),
            ])
            ->filters([
                //
            ])
            ->actions([
                EditAction::make(),
            ])
            ->bulkActions([
                DeleteBulkAction::make(),
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
